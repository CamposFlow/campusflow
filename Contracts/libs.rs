use anchor_lang::prelude::*;

declare_id!("3MxUS8EEbSP8ZWgkxD8KrUwd5SfjHz4wuDnAxgwzDCST");
//Every deployed Solana program has a unique address.
// afrer deployment,Anchor gives you the actual programId

#[program]
pub mod campusflow{
    use super::*;

pub fn register_university(
    ctx: Context<RegisterUniversity>,
    university_id: String,
    name: String,
)-> Result<()>{
    let university = &mut ctx.accounts.university;

    university.university_id = university_id;
    university.name = name;
    university.admin = ctx.accounts.authority.key();
    university.timestamp = Clock::get()?.unix_timestamp;
    university.is_active = true;

    Ok(())
}

pub fn issue_certificate(
    ctx: Context<IssueCertificate>,
    hash : String,
    student_id: String,
    student_name: String,
    certificate_type: String,
) -> Result<()>{
    let cert = &mut ctx.accounts.certificate;

    cert.hash = hash;
    cert.student_id = student_id;
    cert.student_name = student_name;
    cert.certificate_type = certificate_type;
    cert.institution = ctx.accounts.university.name.clone();
    cert.timestamp = Clock::get()?.unix_timestamp;
    cert.is_valid = true;

    Ok(())
}

pub fn revoke_certificate(
    ctx: Context<RevokeCertificate>,
    _hash: String,
    _student_id: String,
)->Result<()>{
    let cert = &mut ctx.accounts.certificate;

    cert.is_valid = false;

    Ok(())
}

pub fn verify_certificate(
    ctx: Context<VerifyCertificate>,
    document_hash: String,
    verifier_org: String,
)-> Result<()>{
    let record = &mut ctx.accounts.verification_record;

    record.document_hash = document_hash;
    record.verifier_org = verifier_org;
    record.verifier = ctx.accounts.verifier.key();
    record.timestamp = Clock::get()?.unix_timestamp;

    Ok(())
}

pub fn approve_clearance(
    ctx: Context<ApproveClearance>,
    student_id: String,
    stage_name: String,
    document_hash: String,
    staff_id: String,
    _university_id: String,
)->Result<()>{
    let record = &mut ctx.accounts.clearance_record;

    record.student_id = student_id;
    record.stage_name = stage_name;
    record.staff_id = staff_id;
    record.document_hash = document_hash;
    record.university_id = ctx.accounts.university.university_id.clone();
    record.timestamp = Clock::get()?.unix_timestamp;
    record.is_approved = true;

Ok(())
}



pub fn report_incident(
    ctx: Context<ReportIncident>,
    incident_id: String,
    student_id: String,
    student_name: String,
    latitude: String,
    longitude: String,
    description: String,
)->Result<()>{
    let incident = &mut ctx.accounts.incident;

    incident.student_id = student_id;
    incident.incident_id = incident_id;
    incident.student_name = student_name;
    incident.latitude = latitude;
    incident.longitude = longitude;
    incident.description = description;
    incident.university_id = ctx.accounts.university.university_id.clone();
    incident.timestamp = Clock::get()?.unix_timestamp;
    incident.is_resolved = false;

    Ok(())
}

pub fn resolve_incident(
    ctx: Context<ResolveIncident>,
    _student_id: String,
    _incident_id: String,
    _university_id:String,
)->Result<()>{
    let incident = &mut ctx.accounts.incident;
    incident.is_resolved = true;

    Ok(())
}

}


#[derive(Accounts)]
#[instruction(university_id:String)]
pub struct RegisterUniversity<'info>{
    #[account(
        init,
        payer=authority,
        space = 1024,
        seeds=[b"university", university_id.as_bytes()],
        bump
    )]
    pub university: Account<'info, University>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program : Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(hash:String, student_id:String)]
pub struct IssueCertificate<'info>{
    #[account(
        init,
        payer = authority,
        space = 1024,
        seeds =[b"certificate", student_id.as_bytes(), hash.as_bytes()],
        bump
    )]
 pub certificate: Account<'info, Certificate>,
    #[account(
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
    pub university: Account<'info, University>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(hash: String, student_id:String)]
pub struct RevokeCertificate<'info>{
    #[account(
        mut,
        seeds=[b"certificate", student_id.as_bytes(), hash.as_bytes()],
        bump,
        constraint = certificate.is_valid == true @ CampusFlowError::InvalidCertificate
    )]
    pub certificate: Account<'info, Certificate>,

     #[account(
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
    pub university: Account<'info, University>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

}



#[derive(Accounts)]
#[instruction(document_hash:String)]
pub struct VerifyCertificate<'info>{
    #[account(
        init,
        payer=verifier,
        space=1024,
        seeds=[b"verification",verifier.key().as_ref(), document_hash.as_bytes()],
        bump
    )]
    pub verification_record:Account<'info, VerificationRecord>,

    #[account(
        seeds=[b"certificate",certificate.student_id.as_bytes(), document_hash.as_bytes()],
        bump,
        constraint = certificate.is_valid==true @ CampusFlowError::InvalidCertificate
    )]
    pub certificate:Account<'info,Certificate>,

     #[account(
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
    pub university: Account<'info, University>,

    #[account(mut)]
    pub verifier:Signer<'info>,
    pub system_program:Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(student_id: String, stage_name: String, university_id:String)]
pub struct ApproveClearance<'info>{
    #[account(
        init,
        payer=authority,
        space = 1024,
        seeds = [b"clearance", student_id.as_bytes(), stage_name.as_bytes(), university_id.as_bytes()],
        bump
    )]
    pub clearance_record : Account<'info, ClearanceRecord>,

     #[account(
        seeds=[b"university", university_id.as_bytes()],
        bump,
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
pub university: Account<'info, University>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(student_id:String, university_id:String, incident_id:String)]
pub struct ReportIncident<'info>{
    #[account(
        init,
        payer=authority,
        space = 1024,
        seeds = [b"incident", university_id.as_bytes(), student_id.as_bytes(), incident_id.as_bytes()],
        bump
    )]
    pub incident: Account<'info, Incident>,
 #[account(
        seeds=[b"university", university_id.as_bytes()],
        bump,
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
    pub university: Account<'info, University>,

    #[account(mut)]
    pub authority : Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(student_id:String, university_id:String, incident_id:String)]
pub struct ResolveIncident<'info>{
    #[account(
        mut,
        seeds = [b"incident", university_id.as_bytes(), student_id.as_bytes(), incident_id.as_bytes()],
        bump,
        constraint = incident.is_resolved == false @CampusFlowError::AlreadyResolved
    )]
     pub incident: Account<'info, Incident>,
 #[account(
        seeds=[b"university", university_id.as_bytes()],
        bump,
        constraint = university.is_active == true @CampusFlowError::UniversityNotActive
    )]
    pub university: Account<'info, University>,

    #[account(mut)]
    pub authority : Signer<'info>,
    pub system_program: Program<'info, System>
}

 // tells anchor this is a data account that will be stored on the chain
//like a table and data fields in it
#[account]
pub struct Certificate{
    pub hash: String, // fingerprint of the document
    pub student_id :String,
    pub student_name: String,
    pub certificate_type: String,
    pub institution: String,
    pub timestamp: i64, //64 bit int used in Solana
    pub is_valid: bool,
}

#[account]
pub struct ClearanceRecord{
    pub student_id: String,
    pub stage_name: String,
    pub document_hash: String,
    pub staff_id: String,
    pub university_id: String,
    pub timestamp: i64,
    pub is_approved: bool,
}

#[account]
pub struct Incident{
    pub incident_id:String,
    pub student_id: String,
    pub student_name: String,
    pub latitude: String,
    pub longitude: String,
    pub description: String,
    pub university_id: String,
    pub timestamp: i64,
    pub is_resolved: bool,
}

#[account]
pub struct VerificationRecord{
    pub document_hash: String,
    pub verifier_org:String,
    pub verifier: Pubkey,
    pub timestamp: i64,
}

#[account]
pub struct University{
    pub university_id: String,
    pub name: String,
    pub admin: Pubkey,
    pub timestamp: i64,
    pub is_active: bool,
}


#[error_code]
pub enum CampusFlowError{
    #[msg("University is not active or not registered on CampusFlow")]
    UniversityNotActive,

    #[msg("Certificate is invalid or revoked")]
    InvalidCertificate,

    #[msg("Clearance has already been approved")]
    AlreadyApproved,

    #[msg("Incident has already been resolved")]
    AlreadyResolved,

    #[msg("Unauthorized action")]
    Unauthorized,
}